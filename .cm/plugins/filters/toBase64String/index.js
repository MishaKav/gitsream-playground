module.exports = (text) => {
  return `base64: ${Buffer.from(text).toString('base64')}`;
}
