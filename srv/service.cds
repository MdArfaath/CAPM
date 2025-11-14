using { ust.arfaath.shaik.db as db} from '../db/schema';

service EmployeeService {
    entity Employees as projection on db.Employees;
}
