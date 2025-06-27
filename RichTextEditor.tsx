import React, { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';

interface RichTextEditorProps {
  initialValue: string;
  onChange: (content: string) => void;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({ initialValue, onChange }) => {
  const editorRef = useRef<any>(null);

  const handleEditorChange = (content: string) => {
    onChange(content);
  };

  return (
    <div className="rich-text-editor">
      <Editor
        apiKey="no-api-key" // In production, you would need a TinyMCE API key
        onInit={(_: any, editor: any) => editorRef.current = editor}
        initialValue={initialValue}
        init={{
          height: 500,
          menubar: true,
          plugins: [
            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
            'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
            'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount',
            'pagebreak'
          ],
          toolbar: 'undo redo | blocks | ' +
            'bold italic forecolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'removeformat | image media link | pagebreak | help',
          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
          file_picker_types: 'image',
          images_upload_handler: (blobInfo: any) => new Promise((resolve) => {
            // In production, you would implement image upload to your server
            const reader = new FileReader();
            reader.onload = (e) => {
              if (e.target) {
                resolve(e.target.result as string);
              }
            };
            reader.readAsDataURL(blobInfo.blob());
          })
        }}
        onEditorChange={handleEditorChange}
      />
    </div>
  );
};

export default RichTextEditor;
