// components/MessageRenderer.tsx
import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { CopyButton } from './CopyButton';

// 1. Define the props shape for our custom <code> renderer
interface CodeProps {
  inline?: boolean;
  className?: string;
  children?: React.ReactNode;
}

// 2. Implement the renderer as a React.FC<CodeProps>
const CodeBlock: React.FC<CodeProps> = ({
  inline = false,
  className = '',
  children,
  ...props
}) => {
  const codeText = String(children).replace(/\n$/, '');
  const match = /language-(\w+)/.exec(className);

  // Only show copy button on multi-line, fenced code blocks
  if (!inline && match) {
    return (
      <div className="relative group my-4">
        <pre className="rounded-lg bg-gray-800 text-white overflow-auto p-4">
          <code className={className} {...props}>
            {children}
          </code>
        </pre>
        <CopyButton text={codeText} />
      </div>
    );
  }

  // Fallback for inline code or no language
  return (
    <code className="bg-gray-200 text-gray-800 px-1 rounded">
      {children}
    </code>
  );
};

// 3. Wire it up in the `components` prop of ReactMarkdown
export function MessageRenderer({ content }: { content: string }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        code: CodeBlock,
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
