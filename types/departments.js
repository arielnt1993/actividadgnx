const gnx = require("@simtlix/gnx");
const Department = require("../models/departments").Department;
const graphql = require("graphql");
const { GraphQLObjectType, GraphQLID, GraphQLString } = graphql;
const {
  CantRepeatName,
  CantDeleteIfChilds,
} = require("../validators/dept.validator");

const { DeptEmployee } = require("../models/dept_employee");
const DepartmentsType = new GraphQLObjectType({
  name: "departmentType",
  description: "represents departments",
  extensions: {
    validations: {
      CREATE: [CantRepeatName],
      UPDATE: [CantRepeatName],
      DELETE: [CantDeleteIfChilds],
    },
  },
  fields: () => ({
    id: { type: GraphQLID },
    dept_name: { type: GraphQLString }
  }),
});

gnx.connect(Department, DepartmentsType, "department", "departments");
module.exports = DepartmentsType;
const deptEmployeeType = require("./dept_employees");
