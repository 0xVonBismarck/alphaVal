import React, { useEffect, useState } from 'react';
import { marked } from 'marked';

function Documentation() {
  const [markdown, setMarkdown] = useState('');

  useEffect(() => {
    // Fetch the markdown file
    fetch('/alphaVal.md')
      .then(response => response.text())
      .then(text => {
        // Parse the markdown text to HTML
        const rawHtml = marked.parse(text);
        setMarkdown(rawHtml);
      });
  }, []);

  // Use a hook to typeset MathJax after the component renders
  useEffect(() => {
    if (window.MathJax) {
      window.MathJax.typesetPromise();
    }
  }, [markdown]);

  return (
    <div className="documentation-container" dangerouslySetInnerHTML={{ __html: markdown }} />
  );
}

export default Documentation; 