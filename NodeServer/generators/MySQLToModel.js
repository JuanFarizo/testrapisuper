const fs = require('fs');
const beautify = require('js-beautify').js;
const beautify2 = require('js-beautify').html;

/* 
    Para usar cambiar:
        - tableName: por el nombre exacto de la tabla (Cuidado que puede sobreescribir otra existente)
        - SQL: por la estructura de la tabla! fijarse como esta copiado, respetar ese formato
                (Copiar desde el '1' al ultimo 'Más')
    
    Genera el modelo en la carpeta ServerNodeJS/generators/output
   */

let tableName = 'sales_u_products';

let SQL = `1	id Primaria	int(11)			No	Ninguna		AUTO_INCREMENT	Cambiar Cambiar	Eliminar Eliminar	
   Más Más
       2	saleID Índice	int(11)			No	Ninguna			Cambiar Cambiar	Eliminar Eliminar	
   Más Más
       3	productID Índice	int(11)			No	Ninguna			Cambiar Cambiar	Eliminar Eliminar	
   Más Más
       4	price	float			No	Ninguna			Cambiar Cambiar	Eliminar Eliminar	
   Más Más
       5	amount	int(11)			No	Ninguna			Cambiar Cambiar	Eliminar Eliminar	
   Más Más
       6	amountOrdered	int(11)			No	Ninguna			Cambiar Cambiar	Eliminar Eliminar	
   Más Más
       7	relevance	int(11)			No	Ninguna			Cambiar Cambiar	Eliminar Eliminar	
   Más Más
       8	controlStateID Índice	int(11)			No	Ninguna			Cambiar Cambiar	Eliminar Eliminar	
   Más Más
       9	pickUpStateID	int(11)			No	Ninguna			Cambiar Cambiar	Eliminar Eliminar	
   Más Más
       10	isAddedByProductID	int(11)			No	Ninguna			Cambiar Cambiar	Eliminar Eliminar	
   Más Más
       11	isAdded	tinyint(1)			No	Ninguna			Cambiar Cambiar	Eliminar Eliminar	
   Más Más
       12	noStock	tinyint(1)			No	Ninguna			Cambiar Cambiar	Eliminar Eliminar	
   Más Más
       13	isActive	tinyint(4)			No	1			Cambiar Cambiar	Eliminar Eliminar	
   Más Más
       14	isDeleted	tinyint(1)			No	Ninguna			Cambiar Cambiar	Eliminar Eliminar	
   Más Más
       15	deletedReasonID	int(11)			No	Ninguna			Cambiar Cambiar	Eliminar Eliminar	
   Más Más
   `;

const snakeToCamel = (str) =>
  str
    .toLowerCase()
    .replace(/([-_][a-z])/g, (group) =>
      group.toUpperCase().replace('-', '').replace('_', '')
    );

let tableNameCC = snakeToCamel(tableName);
let tableNameCCModel =
  tableNameCC.charAt(0).toUpperCase() + tableNameCC.slice(1);

SQL = beautify2(SQL);

const f1 = (sql) => {
  return sql.split('\n').map((e, i) => {
    if (i % 2 != 0) return;
    return e.split(' ');
  });
};

SQL = f1(SQL);

const f2 = (sql) => {
  return sql
    .filter((field) => {
      return field;
    })
    .map((field) => {
      return field.filter((meta) => {
        return !['utf8_general_ci', 'Cambiar', 'Eliminar'].includes(meta);
      });
    });
};

SQL = f2(SQL);

const f3 = (sql) => {
  return sql.map((field) => field.length);
};

const modelSchema = {
  type: 'object',
  required: [],

  properties: {},
};

SQL.forEach((field, i) => {
  if (i == 0) {
    return;
  }

  if (field[2] == 'Índice') {
    field.splice(2, 1);
  }

  if (field[3] == 'No' && field[4] == 'Ninguna') {
    modelSchema.required.push(field[1]);
  }

  modelSchema.properties[field[1]] = {};
  if (field[2].startsWith('int') || field[2].startsWith('tinyint')) {
    modelSchema.properties[field[1]].type = 'integer';
  } else if (field[2].startsWith('float')) {
    modelSchema.properties[field[1]].type = 'string';
  } else if (
    field[2].startsWith('varchar') ||
    field[2].startsWith('tinytext')
  ) {
    modelSchema.properties[field[1]].type = 'string';
  } else if (field[2].startsWith('timestamp')) {
    modelSchema.properties[field[1]].type = 'datetime';
  }

  if (field[4] != 'Ninguna' && field[4] != 'current_timestamp()') {
    modelSchema.properties[field[1]].default = field[4];
  }
});

Model = `
   const {
    Model
} = require('objection');

class ${tableNameCCModel} extends Model {
    static get tableName() {
        return '${tableName}';
    }

    static get jsonSchema() {
        return ${JSON.stringify(modelSchema)}
    }

}

module.exports = ${tableNameCCModel};
`;

fs.writeFile(
  `C:/Users/Gaston/Documents/BitBucket/Rapisuper/NodeServer/generators/output/${tableNameCCModel}.js`,
  beautify(Model, {
    indent_size: 2,
    indent_char: ' ',
    max_preserve_newlines: '2',
    preserve_newlines: true,
    keep_array_indentation: false,
    break_chained_methods: false,
    indent_scripts: 'normal',
    brace_style: 'collapse',
    space_before_conditional: true,
    unescape_strings: false,
    jslint_happy: false,
    end_with_newline: false,
    wrap_line_length: '160',
    indent_inner_html: false,
    comma_first: false,
    e4x: false,
    indent_empty_lines: false,
    indent_style: 'space',
    end_of_line: 'lf',
    trim_trailing_whitespace: true,
    insert_final_newline: true,
    max_line_length: 100,
  }),
  () => {
    console.log('Finish');
  }
);
