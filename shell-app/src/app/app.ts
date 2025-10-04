import { Component, signal, ViewContainerRef, ComponentRef, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { loadRemoteModule } from '@angular-architects/module-federation';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements AfterViewInit {
  protected readonly title = signal('shell-app');
  private childComponentRef: ComponentRef<any> | null = null;

  constructor(private vcr: ViewContainerRef) {}

  ngAfterViewInit() {
    // Auto-load the child app on initialization
    setTimeout(() => this.loadChildApp(), 1000);
  }

  async loadChildApp() {
    try {
      const container = document.getElementById('child-app-container');
      if (container) {
        container.innerHTML = '<p style="color: rgba(255,255,255,0.7);">Loading child microfrontend...</p>';
      }

      // Dynamically import the child microfrontend
      const m = await loadRemoteModule({
        type: 'module',
        remoteEntry: 'http://localhost:4201/remoteEntry.js',
        exposedModule: './ChildFeature'
      });

      // Create the component
      this.childComponentRef = this.vcr.createComponent(m.ChildFeature);
      
      // Append to the container
      if (container && this.childComponentRef?.location?.nativeElement) {
        container.innerHTML = '';
        container.appendChild(this.childComponentRef.location.nativeElement);
      }

      console.log('Child microfrontend loaded successfully!');
    } catch (error) {
      console.error('Error loading child microfrontend:', error);
      const container = document.getElementById('child-app-container');
      if (container) {
        container.innerHTML = '<p style="color: #ff6b6b;">Error loading child microfrontend. Make sure the child app is running on port 4201.</p>';
      }
    }
  }
}
