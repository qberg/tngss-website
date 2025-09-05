export const extractTextFromRichText = (richTextContent) => {
  if (!richTextContent?.root?.children) return ''

  return richTextContent.root.children
    .map(
      (child) =>
        child.children?.map((textNode) => textNode.text).join(' ') || ''
    )
    .join(' ')
    .trim()
}
