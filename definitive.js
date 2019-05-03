/*
Definitive.js
https://github.com/jay94ks/definitive.js
------------------------
MIT License
Copyright (c) 2019 Jay K (jay94ks@gmail.com)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

*/
(function() {
	window.REDEFINE	= 1;
	window.RESET = 2;
	window.ORIGINAL = 'ORG';
	
	window.define = function(fullName, object, flags) {
		if (flags == undefined) flags = 0;
		if (window.definitions == undefined) window.definitions = {};
		if (window.definitions[fullName] == undefined || (flags & RESET)) {
			window.definitions[fullName] = {
				_blocked: false, _state: 'unknown', _cbs : [], _org: null, _object: object,
				state: function() { return this._state; },
				obj: function(org) { return org == 'ORG' ? this._org : this._object; },
				then: function(a, b) {
					if ( b == undefined ) { 
						b = a; a = 'any'; 
					}
					
					a = (a + '').toLowerCase();
					if (a == 'any' || this._state == a) {
						if (this._blocked) 
							this._cbs.push(function() { b(a, definitions[fullName]); });
						
						else b(a, this);
					}
					return this;
				},
				_invoke: function() {
					var current = window;
					var scopes = fullName.split('.');
					
					identifier = scopes.pop();
					if (scopes.length > 0) {
						for (var i = 0; i < scopes.length; i++) {
							current = (current[scopes[i]] == undefined) ?
								(current[scopes[i]] = { }) : current[scopes[i]];
						}
					}
					
					if(current[identifier] != undefined) {
						if ((flags & REDEFINE) || (flags & RESET)) {
							this._state = 'redefined';
							this._org = current[identifier];
						}
						
						else {
							this._state = 'kept';
						}
					}
					else this._state = 'defined';
					
					flags = flags & ~RESET;
					if (this._blocked) {
						definitives.defs.push(this);
						return this;
					}
					
					if (this._state != 'kept')
						current[identifier] = object;
					
					while (this._cbs.length > 0) {
						var fn = this._cbs.splice(0, 1); fn();
					}
					return this;
				}
			};
		}
		
		var retVal = null;
		(retVal = window.definitions[fullName])
			._blocked = definitives._blocked > 0;
		
		return retVal._invoke();
	};
	
	if( !window.definitives ) {
		window.definitives = {
			_blocked: 0, defs: [],
			block: function() { this._blocked++; },
			unblock: function() {
				if ((this._blocked = Math.max(this._blocked - 1, 0)) <= 0) {
					var d = this.defs; this.defs = [];
					for(var i = 0; i < d.length; i++) {
						d[i]._blocked = false; d[i]._invoke();
					}
					return true;
				} return false;
			}
		};
	}
})();
