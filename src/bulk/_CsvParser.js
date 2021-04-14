import BulkTemplateBuilder from './BulkTemplateBuilder'

/**
 * Defines the builder to configure a Parser
 */
export default class _CsvParser {
    /**
     * @param {!BulkTemplateBuilder} parent - RuleConfiguration object
     * @param {Object} parser - settings used during parsing
     * @returns {_CsvParser}
     */
    constructor(parent, parser) {
        if (parent.constructor !== BulkTemplateBuilder) {
            throw new Error("Parent must be a BulkTemplateBuilder");
        }

        this._bulkTemplateBuilder = parent;
        this._parser = parser;
    }

    /**
     * Set the delimiting character
     * @param {string} delimiter - The delimiting character
     * @returns {_CsvParser}
     * @throws {Error}
     */
    setDelimiter(delimiter) {
        if (typeof delimiter !== 'string' && delimiter !== undefined && delimiter === null)
            throw new Error('Parameter delimiter must be a string');
        this._delimiter = delimiter
        return this;
    }

    /**
     * Set the newline sequence. Must be one of \r, \n, or \r\n
     * @param {string} newline - Must be one of \r, \n, or \r\n
     * @returns {_CsvParser}
     * @throws {Error}
     */
     setNewLine(newline) {
        if ((typeof newline !== 'string' | !newline.match(/\\r\\n|\\r|\\n/)) && newline !== undefined && newline === null)
            throw new Error('Parameter newline must be a string and must be one of \r, \n, or \r\n');
        this._newline = newline
        return this;
    }

    /**
     * Set the character used to quote fields
     * @param {string} quoteChar - The character used to quote fields
     * @returns {_CsvParser}
     * @throws {Error}
     */
     setQuoteChar(quoteChar) {
        if (typeof quoteChar !== 'string' && quoteChar !== undefined && quoteChar === null)
            throw new Error('Parameter quoteChar must be a string');
        this._quoteChar = quoteChar
        return this;
    }

    /**
     * Set the character used to escape the quote character within a field
     * @param {string} escapeChar - The character used to escape the quote character within a field
     * @returns {_CsvParser}
     * @throws {Error}
     */
     setEscapeChar(escapeChar) {
        if (typeof escapeChar !== 'string' && escapeChar !== undefined && escapeChar === null)
            throw new Error('Parameter escapeChar must be a string');
        this._escapeChar = escapeChar
        return this;
    }

    /**
     * If true, the first row of parsed data will be interpreted as field names
     * @param {boolean} header - If true, the first row of parsed data will be interpreted as field names
     * @returns {_CsvParser}
     * @throws {Error}
     */
     setHeader(header) {
        if (typeof header !== 'boolean')
            throw new Error('Parameter header must be a boolean');
        this._header = header
        return this;
    }

    /**
     * If true, numeric and boolean data will be converted to their type instead of remaining strings
     * @param {boolean} dynamicTyping - If true, numeric and boolean data will be converted to their type instead of remaining strings
     * @returns {_CsvParser}
     * @throws {Error}
     */
     setDynamicTyping(dynamicTyping) {
        if (typeof dynamicTyping !== 'boolean')
            throw new Error('Parameter dynamicTyping must be a boolean');
        this._dynamicTyping = dynamicTyping
        return this;
    }

    /**
     * Set the encoding to use when opening local files
     * @param {string} encoding - The encoding to use when opening local files
     * @returns {_CsvParser}
     * @throws {Error}
     */
     setEncoding(encoding) {
        if (typeof encoding !== 'string' && encoding !== undefined && encoding === null)
            throw new Error('Parameter encoding must be a string');
        this._encoding = encoding
        return this;
    }

    /**
     * Set a string that indicates a comment
     * @param {string} comments - A string that indicates a comment
     * @returns {_CsvParser}
     * @throws {Error}
     */
     setComments(comments) {
        if (typeof comments !== 'string' && comments !== undefined && comments === null)
            throw new Error('Parameter comments must be a string');
        this._comments = comments
        return this;
    }
    
   /**
     * Returns parent
     * @returns {BulkTemplateBuilder}
     */
    parent() {
        return this._bulkTemplateBuilder;
    }
}