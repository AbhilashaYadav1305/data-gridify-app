import React, { Component } from "react";

// ErrorBoundary HOC
const withErrorBoundary = (WrappedComponent) => {
  class ErrorBoundary extends Component {
    constructor(props) {
      super(props);
      this.state = {
        hasError: false,
        error: null,
        errorInfo: null,
      };
    }

    static getDerivedStateFromError(error) {
      return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
      // You can perform additional logging or error handling here
      console.error("Error caught by ErrorBoundary:", error);
      this.setState({ errorInfo });
    }

    render() {
      const { hasError, error, errorInfo } = this.state;
      if (hasError) {
        // Render an error message or fallback UI
        return (
          <div className="error-ui">
            <h2>Something went wrong!</h2>
            <p>{error && error.toString()}</p>
            <p>{errorInfo && errorInfo.componentStack}</p>
          </div>
        );
      }

      // Render the wrapped component
      return <WrappedComponent {...this.props} />;
    }
  }

  // Set display name for easier debugging
  const displayName =
    WrappedComponent.displayName || WrappedComponent.name || "Component";
  ErrorBoundary.displayName = `ErrorBoundary(${displayName})`;

  return ErrorBoundary;
};

export default withErrorBoundary;
