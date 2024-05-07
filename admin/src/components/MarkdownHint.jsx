import React, { useEffect, useRef } from 'react';

const mdRules = [
  { title: 'From H1 to H6', rule: '# Heading -> ###### Heading' },
  { title: 'Blockquote', rule: '> Your Quote' },
  { title: 'Image', rule: '![image alt](http://image_url.com)' },
  { title: 'Link', rule: '[Link Text](http://your_link.com)' },
];

export default function MarkdownHint() {
  const container = useRef();

  useEffect(() => {
    container.current?.classList.remove('-translate-y-5', 'opacity-0');
    container.current?.classList.add('-translate-y-0', 'opacity-1');
  }, []);

  return (
    <div
      ref={container}
      className="bg-white px-2 py-2 rounded-lg transform -translate-y-5 opacity-0 transition duration-300 ease-in-out hover:shadow-lg "
      style={{marginTop: '2rem'}}
    >
      <h1 className="text-lg font-semibold text-center mb-4">Text Formatting Guide</h1>

      <ul className="space-y-2 ">
        {mdRules.map(({ title, rule }) => (
          <li key={title} className="flex flex-col items-start gap-1 ">
          <span className="text-xs text-gray-700 pt-3 font-medium">{title}</span>
          <code className="text-gray-500 break-all px-2 py-1 rounded-md bg-gray-100 hover:bg-gray-200 transition duration-300 ease-in-out" style={{fontSize:'10px'}}>
            {rule}
          </code>
        </li>
        
        ))}

      </ul>
    </div>
  );
}

