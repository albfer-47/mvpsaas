import React from 'react';
import { Document, Page, Text, View, StyleSheet, PDFViewer } from '@react-pdf/renderer';

// Estilos para o PDF
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 30,
  },
  section: {
    margin: 10,
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 10,
  },
  text: {
    fontSize: 12,
    marginBottom: 5,
  },
  header: {
    fontSize: 12,
    marginBottom: 20,
    textAlign: 'center',
    color: 'grey',
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 30,
    right: 30,
    fontSize: 10,
    textAlign: 'center',
    color: 'grey',
  },
});

interface PdfPreviewProps {
  title: string;
  content: string;
  author: string;
}

// Componente de pré-visualização do PDF
const PdfPreview: React.FC<PdfPreviewProps> = ({ title, content, author }) => {
  // Função para converter HTML simples para texto (implementação básica)
  const htmlToText = (html: string) => {
    // Esta é uma implementação muito básica
    // Em produção, você usaria uma biblioteca mais robusta
    return html
      .replace(/<[^>]*>/g, '') // Remove tags HTML
      .replace(/&nbsp;/g, ' ') // Substitui &nbsp; por espaço
      .replace(/&amp;/g, '&') // Substitui &amp; por &
      .replace(/&lt;/g, '<') // Substitui &lt; por <
      .replace(/&gt;/g, '>'); // Substitui &gt; por >
  };

  return (
    <div className="pdf-preview" style={{ height: '600px', width: '100%' }}>
      <PDFViewer style={{ width: '100%', height: '100%' }}>
        <Document>
          <Page size="A4" style={styles.page}>
            <Text style={styles.header}>Created with PDF Market Intelligence</Text>
            <Text style={styles.title}>{title}</Text>
            <View style={styles.section}>
              <Text style={styles.text}>{htmlToText(content)}</Text>
            </View>
            <Text style={styles.footer}>Created by {author} | {new Date().toLocaleDateString()}</Text>
          </Page>
        </Document>
      </PDFViewer>
    </div>
  );
};

export default PdfPreview;
