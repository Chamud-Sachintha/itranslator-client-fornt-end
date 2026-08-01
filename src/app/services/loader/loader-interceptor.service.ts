import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class LoaderInterceptor implements HttpInterceptor {
    private activeRequests = 0;
    private excludedUrls = [
        'get-message-list',
        'get-lgODoc-List',
        'get-lgDoc-List'
    ];

    constructor(private spinner: NgxSpinnerService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // Check if X-Skip-Loader header is present, or if URL is in the excluded list
        const skipLoaderHeader = request.headers.has('X-Skip-Loader');
        const isExcluded = this.excludedUrls.some(url => request.url.includes(url));

        if (skipLoaderHeader || isExcluded) {
            // Remove custom header if it exists so it doesn't get sent to server
            const modifiedReq = request.headers.has('X-Skip-Loader')
                ? request.clone({ headers: request.headers.delete('X-Skip-Loader') })
                : request;
            return next.handle(modifiedReq);
        }

        if (this.activeRequests === 0) {
            this.spinner.show();
        }
        this.activeRequests++;

        return next.handle(request).pipe(
            finalize(() => {
                this.activeRequests--;
                if (this.activeRequests === 0) {
                    this.spinner.hide();
                }
            })
        );
    }
}
