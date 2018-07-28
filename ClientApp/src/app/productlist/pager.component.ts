import { Input, Component, OnInit } from '@angular/core';

import PaginationModel = Insite.Core.WebApi.PaginationModel;

@Component({
  selector: 'app-pager',
  templateUrl: './pager.component.html',
  styleUrls: ['./pager.component.css']
})
export class PagerComponent implements OnInit {
    @Input() bottom: boolean;
    customContext: any;
    @Input() storageKey: string;
    @Input() pagination: PaginationModel;
    @Input() updateData: () => void;
    @Input() pageChanged: () => void;
    pages: number[];

    constructor() { }

    ngOnInit() {
    }

    showPager(): boolean {
        return this.pagination && (this.showPerPage() || this.showPagination() || this.showSortSelector());
    }   

    showSortSelector(): boolean {
        return !this.bottom && this.pagination.sortOptions != null && this.pagination.sortOptions.length > 1;
    }

    showPerPage(): boolean {
        return !this.bottom && this.pagination.totalItemCount > this.pagination.defaultPageSize;
    }

    showPagination(): boolean {
        return this.pagination.numberOfPages > 1;
    }

    nextPage() {
        this.scrollToTopPager();
        this.pagination.page = Number(this.pagination.page) + 1;
        if (this.pageChanged) {
            this.pageChanged();
        }
        this.updateData();
        return false;
    }

    prevPage() {
        this.scrollToTopPager();
        this.pagination.page -= 1;
        if (this.pageChanged) {
            this.pageChanged();
        }
        this.updateData();
        return false;
    }

    pageInput(): void {
        this.scrollToTopPager();
        if (this.pagination.page > this.pagination.numberOfPages) {
            this.pagination.page = this.pagination.numberOfPages;
        } else if (this.pagination.page < 1) {
            this.pagination.page = 1;
        }
        if (this.pageChanged) {
            this.pageChanged();
        }
        this.updateData();
    }

    updatePageSize(): void {
        /*
        if (this.storageKey) {
            this.paginationService.setDefaultPagination(this.storageKey, this.pagination);
        }
        */
        this.pagination.page = 1;
        if (this.pageChanged) {
            this.pageChanged();
        }
        this.updateData();
    }

    updateSortOrder(): void {
        this.pagination.page = 1;
        if (this.pageChanged) {
            this.pageChanged();
        }
        this.updateData();
    }

    private scrollToTopPager() {
        /*
        angular.element("html, body").animate({
            scrollTop: angular.element(".pager-wrapper").offset().top
        }, 100);
        */
    }

}
