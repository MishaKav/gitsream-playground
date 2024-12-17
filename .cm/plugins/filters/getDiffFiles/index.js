module.exports = (source, keyword) => {
  const { files } = source.diff;

  const relevantFilesDiff = files.filter(file => file.diff.includes(keyword));
  const result = relevantFilesDiff
    .map(
      file =>
        `\`${file.new_file}\`\n\`\`\`diff\n${file.diff
          .split('\n')
          .filter(line => line.startsWith('+') || line.startsWith('-'))
          .join('\n')}\n\`\`\``
    )
    .join('\n');

  return result;
};
