# Angular Microfrontend with Module Federation

This project demonstrates a microfrontend architecture using Angular and Module Federation, where:

- **Shell App** (Port 4200): The main host application that loads microfrontends
- **Child App** (Port 4201): A microfrontend with beautiful custom styling

## 🚀 Quick Start

### Prerequisites
- Node.js (version 16+)
- npm or yarn
- Angular CLI (`npm install -g @angular/cli`)

### Option 1: Easy Startup (Recommended)

Use the provided startup script:
```bash
./start-apps.sh
```

This will start both applications automatically. Open http://localhost:4200 in your browser!

### Option 2: Manual Startup

1. **Start the Child App (Microfrontend)** - Run this first!
   ```bash
   cd child-app
   npm start
   ```
   This starts the child app on `http://localhost:4201`

2. **Start the Shell App (Host)** - In a new terminal
   ```bash
   cd shell-app
   npm start
   ```
   This starts the shell app on `http://localhost:4200`

3. **Open your browser** to `http://localhost:4200`

## 🎨 Adding Tailwind CSS

The child app is ready for Tailwind CSS. To add it properly:

### Method 1: Using Angular 17+ Built-in Support

```bash
cd child-app
ng add @angular/material  # Optional: for better PostCSS support
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

Then update `tailwind.config.js`:
```javascript
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: { extend: {} },
  plugins: [],
}
```

Add to `src/styles.css`:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### Method 2: Manual Configuration

1. Install dependencies:
```bash
cd child-app
npm install -D tailwindcss @tailwindcss/postcss autoprefixer
```

2. Create `postcss.config.js`:
```javascript
module.exports = {
  plugins: {
    '@tailwindcss/postcss': {},
    autoprefixer: {},
  },
}
```

3. Create `tailwind.config.js` and update styles as above.

### Updating Components

Replace the inline styles in `child-feature.html` with Tailwind classes:
```html
<div class="max-w-md mx-auto bg-white rounded-xl shadow-lg overflow-hidden m-4">
  <div class="md:flex">
    <div class="h-48 w-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center">
      <span class="text-white text-2xl font-bold">MFE</span>
    </div>
    <div class="p-8">
      <div class="uppercase tracking-wide text-sm text-indigo-500 font-semibold">Microfrontend</div>
      <h1 class="block mt-1 text-lg leading-tight font-medium text-black">Child Application</h1>
      <p class="mt-2 text-slate-500">Beautiful Tailwind CSS styling in a microfrontend!</p>
    </div>
  </div>
</div>
```

## 🏗️ Architecture

### Module Federation Configuration

**Shell App (`shell-app/webpack.config.js`)**:
- Acts as the **host** application
- Configured to load remotes from `http://localhost:4201/remoteEntry.js`
- Dynamically imports the child microfrontend

**Child App (`child-app/webpack.config.js`)**:
- Acts as a **remote** microfrontend  
- Exposes the `ChildFeature` component via `./ChildFeature`
- Runs on port 4201

### Features

✅ **Shell Application**:
- Clean, responsive UI with gradient background
- Dynamic loading of microfrontends
- Error handling for failed remote loading
- Module Federation host configuration

✅ **Child Microfrontend**:
- Beautiful UI components with custom styling
- Card-based layout with gradients and badges
- Exposed as a federated module
- Independent development and deployment
- Ready for Tailwind CSS integration

## 📁 Project Structure

```
/
├── shell-app/               # Host application (Port 4200)
│   ├── src/app/
│   │   ├── app.ts          # Main component with MF loading logic
│   │   └── app.html        # Shell UI template
│   └── webpack.config.js    # Module Federation host config
│
├── child-app/              # Child microfrontend (Port 4201)
│   ├── src/app/
│   │   └── features/child-feature/
│   │       ├── child-feature.ts     # Exposed component
│   │       └── child-feature.html   # Styled UI component
│   └── webpack.config.js    # Module Federation remote config
│
├── start-apps.sh           # Easy startup script
└── README.md              # This file
```

## 🔧 Development

### Adding New Microfrontends

1. Create a new Angular app: `ng new my-mfe --routing`
2. Install Module Federation: `cd my-mfe && npm install @angular-architects/module-federation`
3. Configure as remote: `npx ng add @angular-architects/module-federation --type remote --port 4202 --stack module-federation-webpack`
4. Update the shell app's `webpack.config.js` remotes configuration
5. Add loading logic in the shell app

### Development Tips

- **Always start the child app first** - The shell app depends on it
- **Check browser console** for Module Federation errors
- **Use different ports** for each microfrontend
- **Test builds** regularly: `npm run build` in each app

## 🚨 Troubleshooting

### Common Issues

1. **"Loading child microfrontend..." message persists**
   - Make sure the child app (port 4201) is running
   - Check browser console for errors
   - Verify webpack remotes configuration

2. **Build errors with Tailwind**
   - Follow the Tailwind setup guide above
   - Ensure PostCSS configuration is correct
   - Try removing `node_modules` and reinstalling

3. **Module Federation errors**
   - Verify both apps are using the same Angular version
   - Check that remoteEntry.js is accessible at `http://localhost:4201/remoteEntry.js`
   - Ensure no CORS issues in browser

## 🌟 Next Steps

- ✅ Complete the Tailwind CSS integration
- 🔄 Add routing within microfrontends  
- 🗄️ Implement shared state management
- 🔐 Add authentication and security
- 🚀 Set up CI/CD for independent deployments
- 📱 Add more styled components and responsive design

## 🛠️ Built With

- **Angular 20** - Frontend framework
- **Module Federation** - Microfrontend architecture
- **Webpack** - Module bundler
- **Tailwind CSS** - Utility-first CSS framework (ready to add)

---

**Happy coding with Angular Module Federation! 🎉**

Need help? Check the troubleshooting section or review the configuration files.