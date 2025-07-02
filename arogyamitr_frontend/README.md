# Lightweight React Template for KAVIA

This project provides a minimal React template with a clean, modern UI and minimal dependencies.

## Features

- **Lightweight**: No heavy UI frameworks - uses only vanilla CSS and React
- **Modern UI**: Clean, responsive design with KAVIA brand styling
- **Fast**: Minimal dependencies for quick loading times
- **Simple**: Easy to understand and modify

## Getting Started

In the project directory, you can run:

### `npm start`

Runs the app in development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

---

## 🧪 Testing: How to Run and Extend Tests

The frontend uses **Jest** (with `@testing-library/react`) for component, page, navigation, hook, and integration testing.

### To run all frontend tests:

```sh
npm test
```
or non-interactive CI mode:
```sh
CI=true npm test
```

- Existing and all new test files should be placed alongside components/pages under `src/` (`*.test.js`)
- See `src/App.test.js` for a sample
- Test setup: see `src/setupTests.js` (Jest matchers & config)

### How to Add New Tests

- Create files named `*.test.js` for each page, component, or integration.
- Use `@testing-library/react`'s `render`, `screen`, and `fireEvent` utilities.
- Test coverage is required for:
    - Page rendering (e.g., Dashboard, Auth, Navigation)
    - Authentication flow (`LoginPage`, `SignupPage`)
    - Navigation/route guards (`ProtectedRoute`)
    - API integration hooks (e.g., `useApi`)

Example basic test for a page:
```js
import { render, screen } from "@testing-library/react";
import DashboardPage from "./pages/DashboardPage";
test("renders dashboard", () => {
  render(<DashboardPage />);
  expect(screen.getByText(/welcome to arogya/i)).toBeInTheDocument();
});
```

---

## Customization

### Colors

The main brand colors are defined as CSS variables in `src/App.css`:

```css
:root {
  --kavia-orange: #E87A41;
  --kavia-dark: #1A1A1A;
  --text-color: #ffffff;
  --text-secondary: rgba(255, 255, 255, 0.7);
  --border-color: rgba(255, 255, 255, 0.1);
}
```

### Components

This template uses pure HTML/CSS components instead of a UI framework. You can find component styles in `src/App.css`. 

Common components include:
- Buttons (`.btn`, `.btn-large`)
- Container (`.container`)
- Navigation (`.navbar`)
- Typography (`.title`, `.subtitle`, `.description`)

## Learn More

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
