// components/CopyButton.tsx
import { useState } from 'react';
import { ClipboardIcon, CheckIcon } from '@heroicons/react/24/outline';

export function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // optionally handle errors here
    }
  }

  return (
    <button
      onClick={handleCopy}
      aria-label="Copy code"
      className="
        absolute top-2 right-2 p-1 rounded
        bg-white bg-opacity-75 hover:bg-opacity-100
        transition-opacity opacity-0 group-hover:opacity-100
      "
    >
      {copied
        ? <CheckIcon className="h-5 w-5 text-green-600" />
        : <ClipboardIcon className="h-5 w-5 text-gray-600" />
      }
    </button>
  );
}
