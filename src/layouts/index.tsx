import React from 'react';

interface IndexProps {
  title: string;
}

const Index = ({ title }: IndexProps) => (
  <header>
    <h1>
      <a className="underlined" href="#">
        {title}
      </a>
    </h1>
  </header>
);

export default Index;
