/**
 * @fileoverview Rule to check ChangeDetectionStrategy
 * @author Eduard Gorte
 */

"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

const COMMA = ',';
const EMPTY = '';
const CHANGE_DETECTION_KEY = 'changeDetection';
const CHANGE_DETECTION_STRATEGY = 'ChangeDetectionStrategy';
const ON_PUSH = 'OnPush';
const CHANGE_DETECTION_STRATEGY_ON_PUSH = CHANGE_DETECTION_STRATEGY + '.' + ON_PUSH;

const rules = {
    "on-push": {
        meta: {
            type: "suggestion",

            docs: {
                description: "check ChangeDetectionStrategy is OnPush",
                category: "Possible Errors",
                recommended: true,
            },
            fixable: "code",
            schema: [] // no options
        },
        create: function (context) {
            return {
                CallExpression(node) {
                    if (node.callee.name === 'Component') {
                        const sourceCode = context.getSourceCode(node);
                        const configurationMetadata = sourceCode.getText(node);
                        const invalid = configurationMetadata.indexOf(CHANGE_DETECTION_STRATEGY_ON_PUSH) === -1;

                        if (invalid) {
                            context.report({
                                node: node.callee, // Component
                                message: `${node.callee.name} should have ${CHANGE_DETECTION_STRATEGY_ON_PUSH}`,
                                fix: function (fixer) {
                                    const hasChangeDetectionKey = configurationMetadata.indexOf(CHANGE_DETECTION_KEY) !== -1;
                                    // I don't know how to get child node, gonna get tokens instead
                                    const tokens = sourceCode.getTokens(node.arguments[0]);
                                    if (hasChangeDetectionKey) {
                                        // Get index of enum property token separated the dot token
                                        const targetTokenIndex = tokens.findIndex(x => x.value === CHANGE_DETECTION_STRATEGY) + 2;
                                        return fixer.replaceText(tokens[targetTokenIndex], ON_PUSH);
                                    } else {
                                        // We don't need two punctuator tokens `})`
                                        const lastPropertyPunctuatorToken = tokens[tokens.length - 2];
                                        // Check for the presence of a comma character to avoid unnecessary insertion
                                        const hasComma = lastPropertyPunctuatorToken.value === COMMA;
                                        // Insert code block as multiline string
                                        return fixer.insertTextAfter(lastPropertyPunctuatorToken, `${hasComma ? EMPTY : COMMA}
                                        ${CHANGE_DETECTION_KEY}: ${CHANGE_DETECTION_STRATEGY_ON_PUSH}`);
                                    }
                                }
                            });
                        }
                    }
                }
            };
        }
    }
};

module.exports = {
    rules,
}
