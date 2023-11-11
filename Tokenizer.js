/**
 * Building a Parser from scratch
 *
 * Course info: http://dmitrysoshnikov.com/courses/parser-from-scratch/
 *
 * (C) 2020-present Dmitry Soshnikov <dmitry.soshnikov@gmail.com>
 */

/**
 * Tokenizer spec.
 */
const Spec = [
  
    [/^\{/,'{'],
  
    [/^\}/,'}'],
  
    [/^\(/,'('],
  
    [/^\)/,')'],
  
    [/^\d+(\.\d+)?/, 'NUMBER'],
  
    [/^\bsqrt\b/, 'sqrt'],
  
    [/^\bln\b/, 'ln'],
  
    [/^\bfrac\b/, 'frac'],
  
    [/^\bsinx\b/, 'sinx'],
  
    [/^\bcosx\b/, 'cosx'],
  
    [/^\btanx\b/, 'tanx'],
  
    [/^[*\/]/, 'MULTIPLICATIVE_OPERATOR'],
  
    [/e\^/, 'e^'],
  
    [/x\^/, 'x^'],
  
    [/^\bx\b/, 'x'],
  
    [/[a-z]\^/, 'slt^'],
  
    [/^\w+/,'IDENTIFIER'],
    
    [/^[+\-]/, 'ADDITIVE_OPERATOR'],
  
    ];
    
    /**
     * Tokenizer class.
     *
     * Lazily pulls a token from a stream.
     */
    class Tokenizer {
      /**
       * Initializes the string.
       */
      init(string) {
        this._string = string;
        this._cursor = 0;
      }
    
      /**
       * Whther the tokenizer reached EOF.
       */
      isEOF() {
        return this._cursor === this._string.length;
      }
    
      /**
       * Whether we still have more tokens.
       */
      hasMoreTokens() {
        return this._cursor < this._string.length;
      }
    
      /**
       * Obtains next token.
       */
      getNextToken() {
        if (!this.hasMoreTokens()) {
          return null;
        }
    
        const string = this._string.slice(this._cursor);
    
        for (const [regexp, tokenType] of Spec) {
          const tokenValue = this._match(regexp, string);
    
          if (tokenValue == null){ 
            continue;
          }
    
          if (tokenType == null) {
            return this.getNextToken();
          }
    
          return{
            type: tokenType,
            value: tokenValue,
            next: this._string.slice(this._cursor)
          };
        }
    
        throw new SyntaxError(`Unexpected token: "${string[0]}"`);  
      }
    
      _match(regexp, string) {
        const matched = regexp.exec(string);
        if (matched !== null) {
          this._cursor += matched[0].length;
          return  matched[0];
        }
      }
      
    }
    
    module.exports = {
      Tokenizer,
    };
    