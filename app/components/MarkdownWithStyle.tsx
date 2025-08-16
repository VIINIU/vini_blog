// components/MarkdownWithStyle.tsx
import React from 'react';

type MarkdownWithStyleProps = {
  content: string;
};

const MarkdownWithStyle: React.FC<MarkdownWithStyleProps> = ({ content }) => {
  return (
    <div className="markdown-content">
      <div className="prose lg:prose-xl">
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    </div>
  );
};

export default MarkdownWithStyle;
