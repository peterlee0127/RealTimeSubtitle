module.exports = {
    "extends": "google",
     "parserOptions": {
        "ecmaVersion": 6,
        "sourceType": "module",
        "ecmaFeatures": {
            "jsx": true
        }
    },
     "rules": {
         "semi": 2,
         "comma-dangle": ["error", "never"]
     },
    "env": {
        "node": true,
        "mongo": true,
        "es6": true
    }
};
