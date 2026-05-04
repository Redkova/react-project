import React, { Component } from 'react';
import Header from './Header';
import Footer from './Footer';

type Props = {
  children: React.ReactNode;
};

class MainLayout extends Component<Props> {
  render() {
    return (
      <div className="min-h-screen bg-linear-to-br from-gray-100 to-gray-200 flex flex-col items-center">
        <Header />

        <main className="flex flex-col items-center w-full flex-1 pt-5">
          {this.props.children}
        </main>

        <Footer />
      </div>
    );
  }
}

export default MainLayout;
