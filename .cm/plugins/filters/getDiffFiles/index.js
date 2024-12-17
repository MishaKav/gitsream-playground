/**
 * Filters and formats the diff files from the source object that contain the specified keyword
 *
 * @param {Object} source - The source object containing the diff information
 * @param {Object} source.diff - The diff object containing the files array
 * @param {Array} source.diff.files - The array of file objects with diff information
 * @param {string} source.diff.files[].original_file - The original file name
 * @param {string} source.diff.files[].new_file - The new file name
 * @param {string} source.diff.files[].diff - The diff content of the file (in GitHub format)
 * @param {string} source.diff.files[].original_content - The original content of the file
 * @param {string} source.diff.files[].new_content - The new content of the file
 * @param {string} keyword - The keyword to filter the diff content
 * @returns {string} A string containing the formatted diff files that include the keyword for markdown diff look
 */
const getDiffFiles = (source, keyword) => {
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

  return JSON.stringify(result);
};

module.exports = getDiffFiles;
