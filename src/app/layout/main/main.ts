import { Component } from '@angular/core';
import { Router ,RouterModule} from '@angular/router';
import { Auth } from '../../auth/auth'; 
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-main',
  imports: [
    RouterModule,
    CommonModule
  ],
  templateUrl: './main.html',
  styleUrl: './main.css'
})
export class Main {

  isPacientesMenuOpen = false;

  constructor(private authService: Auth, private router: Router) {}

  togglePacientesMenu(): void {
    this.isPacientesMenuOpen = !this.isPacientesMenuOpen;
  }

  logout(): void {
    this.authService.logout(); 
    this.router.navigate(['/login']); 
  }
}
