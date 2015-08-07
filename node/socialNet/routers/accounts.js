module.exports = function(app, modules) {
    app.get('/accounts/:id', function(req, res) {
        var accountId = req.params.id=='me'?req.session.accountId:req.params.id;
        models.Account.findById(accountId, function(account) {
            if( accountId == 'me' || models.Account.hasContact(account, req.session.accountId) ) {
                account.isFrend = true;
            }
            res.send(account);
        })
    })

    //获取状态列表
    app.get('/accounts/:id/status', function(req, res) {
        var accountId = req.params.id == 'me'
                            ?req.session.accountId
                            :req.params.id;

        models.Account.findById(accountId, function(account) {
            res.send(account.status);
        });
    });

    //设置状态列表
    app.post('/accounts/:id/status', function(req, res) {
        var accountId = req.params.id == 'me'
                            ?req.session.accountId
                            :req.params.id;
        models.Account.findById(accountId, function(account) {
            status = {
                name: account.name,
                status: req.param('status')
            }
            account.status.push(status);

            account.activity.push(status);

            account.save(function( err ) {
                if( err ) {
                    console.log('Error saving account:' + err);
                } else {
                    app.triggerEvent('event:'+ accountId, {
                        from: accountId,
                        data: status,
                        action: 'status'
                    })
                }
            });
        });

        res.send(200);
    })

    //获取活动列表
    app.get('/accounts/:id/activity', function(req, res) {
        var accountId = req.params.id == 'me'
                            ?req.session.accountId
                            :req.params.id;
        models.Account.findById(accountId, function(account) {
            res.send(account.activity);
        });
    });

    app.get('/accounts/:id/contacts', function(req, res) {
        var accountId = req.params.id == 'me'
                            ? req.session.accountId
                            :req.params.id;
        models.Account.findById(accountId, function(account) {
            res.send(account.contacts);
        })
    })


    app.post('/accounts/:id/contact', function(req, res) {
        var accountId = req.params.id == 'me'
                            ?req.session.accountId
                            :req.params.id;

        var contactId = req.param('contactId', null);

        if( null == contactId ) {
            res.send(400);
            return;
        }

        models.Account.findById(accountId, function(account) {
            if( account ) {
                models.Account.findById(contactId, function(contact) {
                    models.Account.addContact(account, contact);

                    models.Account.addContact(contact, account);
                    account.save();
                })
            }
            res.send(200);
        })
    });


    app.delete('/accounts/:id/contact', function(req, res) {
        var accountId = req.params.id=='me'
                            ?req.session.accountId
                            :req.params.id;
        var contactId = req.param('contactId', null);
        if( null == contactId ) {
            res.send(400);
            return;
        }
        models.Account.findById(accountId, function(account) {
            if( !account ) return;

            models.Account.findById(contactId, function(contact, err) {
                if( !contact ) return;
                models.Account.removeContact(account, contactId);

                models.Account.removeContact(contact, accountId);
            })

            res.send(200);
        });
    })
}