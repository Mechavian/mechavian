(function() {
    const util = require('util');
    const path = require('path');
    const express = require('express');

    const staticOptions = {
        etag: false
    };

    const port = process.env.port || 3000;

    const app = express();

    var clientDir = path.join(__dirname, './client');
    console.log('Serving files in "%s"', clientDir);

    app.use(express.static(clientDir, staticOptions));
    app.use(function(req, res, next) {
        if (req.path.startsWith('/api/')) {
            res.status(404).send('APIs no longer exist here. Try the api site...');
        } else if (path.extname(req.path)) {
            next();
        } else {
            res.sendFile(path.join(__dirname, '/client/index.html'));
        }
    });

    app.listen(port);

    var url = util.format('http://localhost:%d', port);
    console.log('Server running at "%s"', url);
})();
