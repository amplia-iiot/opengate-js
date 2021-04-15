import BulkTemplateBuilder from './BulkTemplateBuilder'

/**
 * Defines the builder to configure a Parser
 */
export default class _ExcelParser {
    /**
     * @param {!BulkTemplateBuilder} parent - RuleConfiguration object
     * @param {Object} parser - settings used during parsing
     * @returns {_ExcelParser}
     */
    constructor(parent, parser) {
        if (parent.constructor !== BulkTemplateBuilder) {
            throw new Error("Parent must be a BulkTemplateBuilder");
        }

        this._bulkTemplateBuilder = parent;
        this._parser = {};

        this.setEncoding(parser.encoding);
        this.setHeader(parser.header);
        this.setSheets(parser.sheets);
        this._build()
    }

    /**
     * Set the input data encoding
     * @param {string} encoding - Input data encoding
     * @returns {_ExcelParser}
     * @throws {Error}
     */
     setEncoding(encoding) {
        if (typeof encoding !== 'string' && encoding !== undefined && encoding === null)
            throw new Error('Parameter encoding must be a string');
        this._encoding = encoding
        return this;
    }

    /**
     * If true, include header
     * @param {boolean} header - If true, include header
     * @returns {_ExcelParser}
     * @throws {Error}
     */
     setHeader(header) {
        if (typeof header !== 'boolean')
            throw new Error('Parameter header must be a boolean');
        this._header = header
        return this;
    }

    /**
     * If specified, only parse specified sheets
     * @param {Array} sheets - If specified, only parse specified sheets
     * @returns {_ExcelParser}
     * @throws {Error}
     */
     setSheets(sheets) {
        if (!Array.isArray(sheets))
            throw new Error('Parameter sheets must be an array');
        this._sheets = sheets
        return this;
    }
    
    _build() {
        this._bulkTemplateBuilder._parser = merge(true, this._parser);
        return this._bulkTemplateBuilder;
    }

   /**
     * Returns parent
     * @returns {BulkTemplateBuilder}
     */
    parent() {
        return this._bulkTemplateBuilder;
    }
}