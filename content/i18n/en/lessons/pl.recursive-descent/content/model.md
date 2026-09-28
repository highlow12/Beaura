# LL Grammars and Left Recursion

Recursive descent works well with LL-style grammars, where the current token can guide the choice of the next rule. If direct left recursion appears in a rule such as Expr → Expr + Term, parseExpr calls itself before consuming a token, causing infinite recursion.

Left recursion can be rewritten as a repetition, for example Expr → Term ExprTail and ExprTail → + Term ExprTail | ε. This transformation helps the parser terminate, but check that it preserves the grammar's precedence and associativity.
