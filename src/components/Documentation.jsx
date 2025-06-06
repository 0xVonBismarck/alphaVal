import React, { useEffect, useState } from 'react';
import { marked } from 'marked';

function Documentation() {
  const [markdown, setMarkdown] = useState('');
  const [loading, setLoading] = useState(true);
  const [tocOpen, setTocOpen] = useState(false);

  useEffect(() => {
    // Configure marked options for better table and content rendering
    marked.setOptions({
      breaks: true,
      gfm: true, // GitHub Flavored Markdown
      tables: true,
      headerIds: true,
      mangle: false
    });

    // Fetch the markdown file
    fetch('/alphaVal.md')
      .then(response => response.text())
      .then(text => {
        // Parse the markdown text to HTML
        const rawHtml = marked.parse(text);
        setMarkdown(rawHtml);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error loading documentation:', error);
        setLoading(false);
      });
  }, []);

  // Use a hook to typeset MathJax after the component renders
  useEffect(() => {
    if (window.MathJax && markdown) {
      window.MathJax.typesetPromise();
    }
  }, [markdown]);

  // Extract table of contents from markdown
  const generateTOC = () => {
    if (!markdown) return [];
    
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = markdown;
    
    const headers = tempDiv.querySelectorAll('h1, h2, h3, h4');
    return Array.from(headers).map(header => ({
      level: parseInt(header.tagName.charAt(1)),
      text: header.textContent,
      id: header.id || header.textContent.toLowerCase().replace(/[^a-z0-9]+/g, '-')
    }));
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setTocOpen(false);
  };

  if (loading) {
    return (
      <div className="documentation-container">
        <div className="documentation-loading">
          <div className="loading-spinner"></div>
          <p>Loading documentation...</p>
        </div>
      </div>
    );
  }

  const tocItems = generateTOC();

  return (
    <div className="documentation-container">
      {tocItems.length > 0 && (
        <div className="documentation-header">
          <button 
            className="toc-toggle"
            onClick={() => setTocOpen(!tocOpen)}
            aria-label="Toggle table of contents"
          >
            📑 Table of Contents
          </button>
          {tocOpen && (
            <div className="toc-dropdown">
              <nav className="table-of-contents">
                {tocItems.map((item, index) => (
                  <button
                    key={index}
                    className={`toc-item toc-level-${item.level}`}
                    onClick={() => scrollToSection(item.id)}
                  >
                    {item.text}
                  </button>
                ))}
              </nav>
            </div>
          )}
        </div>
      )}
      <div className="documentation-content" dangerouslySetInnerHTML={{ __html: markdown }} />
    </div>
  );
}

export default Documentation; 