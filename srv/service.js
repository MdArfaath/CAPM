const cds = require('@sap/cds');
const { SELECT } = require('@sap/cds/lib/ql/cds-ql');
module.exports = cds.service.impl(srv => {
    const {Employees} = srv.entities;

    srv.before('CREATE', Employees, async (req) => {
        const {salaryAmount, CURRENCY_CODE_code} = req.data;

        if (!(salaryAmount < 50000 && CURRENCY_CODE_code === 'USD')) {
            req.error(400, 'Employees salary must be less than 50000 USD');
        }
    });

    srv.after('CREATE', Employees, async(data,req) => {
        console.log('Create Operation Successfull');
    });

    srv.before('UPDATE', Employees, async(req) => {
        const { salaryAmount, CURRENCY_CODE_code, nameFirst, loginName} = req.data;

        if (!(salaryAmount < 50000 && CURRENCY_CODE_code === 'USD')) {
            req.error(400, 'Employees salary must be less than 50000 USD');
        }

        const oldData = await SELECT.one.from(Employees).where({ID: req.data.ID});
        
        if (oldData) {
            if (nameFirst && nameFirst !== oldData.nameFirst) {
                req.error (400, 'Operation not allowed');
            }

            if (loginName && loginName !== oldData.loginName){
                req.error(400, 'Operation not allowed');
            }
        }
    });

    srv.after('UPDATE', Employees, async() => {
        console.log('Update operation successfull');
    });

    
srv.before('DELETE', Employees, async (req) => {
        const oldData = await SELECT.one.from(Employees).where({ ID: req.data.ID });
        if (oldData && oldData.nameFirst && oldData.nameFirst.startsWith('S')) {
            req.error(400, "Delete operation not allowed: nameFirst starts with 'S'.");
        }
    });

    srv.after('DELETE', Employees, async () => {
        console.log('Delete operation successful');
    });


})