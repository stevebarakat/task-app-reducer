import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
          <div>
            <h4>Something weird happened.</h4>
            <button onClick={() => window.location.reload()}>Try Again</button>
          </div>

      );
    }

    return this.props.children;
  }
};

export default ErrorBoundary;