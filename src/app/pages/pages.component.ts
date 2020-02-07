import { Component, OnInit, Inject } from '@angular/core';
import { NbSidebarService, NbThemeService, NbMenuService, NB_WINDOW } from '@nebular/theme';
import { MENU_ITEMS } from './pages-menu';
import { filter, map } from 'rxjs/operators';
import { AuthService } from '../_services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-pages',
    templateUrl: './pages.component.html',
    styleUrls: ['./pages.component.scss']
})

export class PagesComponent implements OnInit {

    currentUser: any;
    menu = MENU_ITEMS;
    currentTheme = 'dark';
    themes = [
        { value: 'dark', name: 'Dark' },
        { value: 'default', name: 'Light' }
    ];
    userPictureOnly = false;
    userMenu = [
        { title: 'Profile', link: '/pages/profile', icon: 'person-outline', },
        { title: 'Log out', icon: 'unlock-outline', }];
    user: any;
    isContected = false;

    constructor(
        private sidebarService: NbSidebarService,
        private themeService: NbThemeService,
        private menuService: NbMenuService,
        @Inject(NB_WINDOW) private window,
        private authService: AuthService,
        private router: Router
    ) {
        this.currentUser = this.authService.currentUserValue;
    }

    ngOnInit() {
        this.isContected = this.currentUser ? true : false;
        this.currentTheme = this.themeService.currentTheme;
        this.initMenu();
    }

    initMenu() {
        this.menuService.onItemClick()
            .pipe(filter(({ tag }) => tag === 'my-context-menu'), map(({ item: { title } }) => title),
            ).subscribe(title => {
                switch (title) {
                    case 'Profile':
                        this.goProfile();
                        break;
                    default:
                        this.goLogout();
                        break;
                }
            });
    }

    toggleSidebar() {
        this.sidebarService.toggle(true);
        return false;
    }

    changeTheme(themeName: string) {
        this.themeService.changeTheme(themeName);
    }

    navigateHome() {
        this.menuService.navigateHome();
        return false;
    }

    goProfile() {
        // this.router.navigate(['./pages/profile/']);
    }

    goLogout() {
        console.log('Go to Logout');
        this.authService.logout();
    }
}
