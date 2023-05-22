# React Grid App

This is a React app that provides a customizable grid component with various functionalities such as search, column sorting, infinite scroll, responsive layout, themes, and column pinning. The grid component expects two props: Table Config and Table Data.

## Installation

To run this React app locally, please follow these steps:

1. Clone the repository: `git clone <repository_url>`
2. Navigate to the project directory: `cd react-grid-app`
3. Install the dependencies: `npm install`
4. Start the development server: `npm start`
5. Open your browser and visit `http://localhost:3000` to view the app.

## Table Component

The table component is a reusable component that can be easily integrated into any React application. It provides the following functionalities:

1. **Search**: Allows searching and filtering the grid data based on user input.
2. **Column Sorting**: Enables sorting the grid data by clicking on the column headers.
3. **Infinite Scroll**: Implements infinite scrolling using the React Virtuoso package, providing a smooth scrolling experience with optimal performance.
4. **Responsive Layout**: The grid adjusts its height and width based on the viewport size, ensuring a responsive design.
5. **Theme**: Supports a dark/light theme for enhanced visual appeal and user experience.
6. **Column Pinning**: Allows pinning columns on the left side of the grid for easy reference and visibility.

## Usage

To use the grid component in your React application, follow these steps:

1. Import the Grid component: `import Grid from './components/Grid';`
2. Pass the Grid Config Info and Grid Data as props to the Grid component:
```jsx
<TableComponent
  config={gridConfigInfo} 
  data={gridData}
/>
```
3. Customize the Config Info object and provide the necessary configurations for the Table component, such as column definitions, sorting options, and pinning settings.
4. Provide the Data as an array of objects containing the actual data to be displayed in the Table.

## Dependencies

The following dependencies are used in this React app:

- axios: ^1.4.0
- lodash: ^4.17.21
- react: ^18.2.0
- react-dom: ^18.2.0
- react-icons: ^4.8.0

Please refer to the package.json file for the specific versions of these dependencies used in the app.

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvement, please feel free to open an issue or submit a pull request.
---

Thank you for using the React Data Gridify App! We hope you find it useful and easy to integrate into your projects. If you have any questions or need further assistance, please don't hesitate to reach out. Happy coding!
