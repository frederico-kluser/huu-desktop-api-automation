// Usando require() devido ao verbatimModuleSyntax - conforme know-how.txt
const schemas = require('../../../../src/interface/schemas/automation.schemas');

describe('automation.schemas coverage', () => {
  // Testar que todas as exports são objetos JSON Schema válidos
  test('exports all schemas as objects', () => {
    const schemaNames = [
      'mouseMoveJsonSchema',
      'mouseClickJsonSchema',
      'mouseDragJsonSchema',
      'mouseScrollJsonSchema',
      'screenFindJsonSchema',
      'screenCaptureJsonSchema',
    ];

    schemaNames.forEach((schemaName) => {
      expect(schemas[schemaName]).toBeDefined();
      expect(typeof schemas[schemaName]).toBe('object');
      expect(schemas[schemaName].type).toBe('object');
      expect(schemas[schemaName].properties).toBeDefined();
    });
  });

  // Testar estrutura de mouseMoveJsonSchema
  test('mouseMoveJsonSchema has correct structure', () => {
    const schema = schemas.mouseMoveJsonSchema;
    expect(schema.required).toEqual(['x', 'y']);
    expect(schema.additionalProperties).toBe(false);
    expect(schema.properties.x.type).toBe('integer');
    expect(schema.properties.x.minimum).toBe(0);
    expect(schema.properties.y.type).toBe('integer');
    expect(schema.properties.y.minimum).toBe(0);
    expect(schema.properties.smooth.type).toBe('boolean');
    expect(schema.properties.smooth.default).toBe(true);
    expect(schema.properties.duration.type).toBe('integer');
    expect(schema.properties.duration.minimum).toBe(100);
    expect(schema.properties.duration.maximum).toBe(5000);
    expect(schema.properties.duration.default).toBe(1000);
  });

  // Testar estrutura de mouseClickJsonSchema
  test('mouseClickJsonSchema has correct structure', () => {
    const schema = schemas.mouseClickJsonSchema;
    expect(schema.additionalProperties).toBe(false);
    expect(schema.properties.x.type).toBe('integer');
    expect(schema.properties.x.minimum).toBe(0);
    expect(schema.properties.y.type).toBe('integer');
    expect(schema.properties.y.minimum).toBe(0);
    expect(schema.properties.button.type).toBe('string');
    expect(schema.properties.button.enum).toEqual(['left', 'right', 'middle']);
    expect(schema.properties.button.default).toBe('left');
    expect(schema.properties.doubleClick.type).toBe('boolean');
    expect(schema.properties.doubleClick.default).toBe(false);
    expect(schema.properties.smooth.type).toBe('boolean');
    expect(schema.properties.smooth.default).toBe(true);
    expect(schema.properties.duration.type).toBe('integer');
    expect(schema.properties.duration.minimum).toBe(100);
    expect(schema.properties.duration.maximum).toBe(5000);
    expect(schema.properties.duration.default).toBe(1000);
  });

  // Testar estrutura de mouseDragJsonSchema
  test('mouseDragJsonSchema has correct structure', () => {
    const schema = schemas.mouseDragJsonSchema;
    expect(schema.required).toEqual(['from', 'to']);
    expect(schema.additionalProperties).toBe(false);

    // Testar propriedade 'from'
    expect(schema.properties.from.type).toBe('object');
    expect(schema.properties.from.required).toEqual(['x', 'y']);
    expect(schema.properties.from.additionalProperties).toBe(false);
    expect(schema.properties.from.properties.x.type).toBe('integer');
    expect(schema.properties.from.properties.x.minimum).toBe(0);
    expect(schema.properties.from.properties.y.type).toBe('integer');
    expect(schema.properties.from.properties.y.minimum).toBe(0);

    // Testar propriedade 'to'
    expect(schema.properties.to.type).toBe('object');
    expect(schema.properties.to.required).toEqual(['x', 'y']);
    expect(schema.properties.to.additionalProperties).toBe(false);
    expect(schema.properties.to.properties.x.type).toBe('integer');
    expect(schema.properties.to.properties.x.minimum).toBe(0);
    expect(schema.properties.to.properties.y.type).toBe('integer');
    expect(schema.properties.to.properties.y.minimum).toBe(0);

    expect(schema.properties.duration.type).toBe('integer');
    expect(schema.properties.duration.minimum).toBe(100);
    expect(schema.properties.duration.maximum).toBe(5000);
    expect(schema.properties.duration.default).toBe(1000);
    expect(schema.properties.smooth.type).toBe('boolean');
    expect(schema.properties.smooth.default).toBe(true);
  });

  // Testar estrutura de mouseScrollJsonSchema
  test('mouseScrollJsonSchema has correct structure', () => {
    const schema = schemas.mouseScrollJsonSchema;
    expect(schema.required).toEqual(['direction']);
    expect(schema.additionalProperties).toBe(false);
    expect(schema.properties.direction.type).toBe('string');
    expect(schema.properties.direction.enum).toEqual(['up', 'down']);
    expect(schema.properties.amount.type).toBe('integer');
    expect(schema.properties.amount.minimum).toBe(1);
    expect(schema.properties.amount.maximum).toBe(10);
    expect(schema.properties.amount.default).toBe(3);
    expect(schema.properties.smooth.type).toBe('boolean');
    expect(schema.properties.smooth.default).toBe(true);
    expect(schema.properties.duration.type).toBe('integer');
    expect(schema.properties.duration.minimum).toBe(100);
    expect(schema.properties.duration.maximum).toBe(5000);
    expect(schema.properties.duration.default).toBe(1000);
  });

  // Testar estrutura de screenFindJsonSchema
  test('screenFindJsonSchema has correct structure', () => {
    const schema = schemas.screenFindJsonSchema;
    expect(schema.required).toEqual(['template']);
    expect(schema.additionalProperties).toBe(false);
    expect(schema.properties.template.type).toBe('string');
    expect(schema.properties.template.minLength).toBe(1);
    expect(schema.properties.confidence.type).toBe('number');
    expect(schema.properties.confidence.minimum).toBe(0);
    expect(schema.properties.confidence.maximum).toBe(1);
    expect(schema.properties.confidence.default).toBe(0.8);

    // Testar propriedade 'region'
    expect(schema.properties.region.type).toBe('object');
    expect(schema.properties.region.required).toEqual(['x', 'y', 'width', 'height']);
    expect(schema.properties.region.additionalProperties).toBe(false);
    expect(schema.properties.region.properties.x.type).toBe('integer');
    expect(schema.properties.region.properties.x.minimum).toBe(0);
    expect(schema.properties.region.properties.y.type).toBe('integer');
    expect(schema.properties.region.properties.y.minimum).toBe(0);
    expect(schema.properties.region.properties.width.type).toBe('integer');
    expect(schema.properties.region.properties.width.minimum).toBe(1);
    expect(schema.properties.region.properties.height.type).toBe('integer');
    expect(schema.properties.region.properties.height.minimum).toBe(1);
  });

  // Testar estrutura de screenCaptureJsonSchema
  test('screenCaptureJsonSchema has correct structure', () => {
    const schema = schemas.screenCaptureJsonSchema;
    expect(schema.additionalProperties).toBe(false);

    // Testar propriedade 'region'
    expect(schema.properties.region.type).toBe('object');
    expect(schema.properties.region.required).toEqual(['x', 'y', 'width', 'height']);
    expect(schema.properties.region.additionalProperties).toBe(false);
    expect(schema.properties.region.properties.x.type).toBe('integer');
    expect(schema.properties.region.properties.x.minimum).toBe(0);
    expect(schema.properties.region.properties.y.type).toBe('integer');
    expect(schema.properties.region.properties.y.minimum).toBe(0);
    expect(schema.properties.region.properties.width.type).toBe('integer');
    expect(schema.properties.region.properties.width.minimum).toBe(1);
    expect(schema.properties.region.properties.height.type).toBe('integer');
    expect(schema.properties.region.properties.height.minimum).toBe(1);

    expect(schema.properties.format.type).toBe('string');
    expect(schema.properties.format.enum).toEqual(['png', 'jpg']);
    expect(schema.properties.format.default).toBe('png');
  });

  // Test para garantir que todos os schemas são objetos JSON válidos
  test('all schemas are valid JSON serializable', () => {
    Object.values(schemas).forEach((schema) => {
      // Testar que pode ser serializado e deserializado
      const jsonString = JSON.stringify(schema);
      const parsed = JSON.parse(jsonString);
      expect(parsed).toEqual(schema);
    });
  });

  // Test para verificar que nenhuma propriedade requerida tem valor default em conflito
  test('no required properties have conflicting defaults', () => {
    const schemasToCheck = [
      { name: 'mouseMoveJsonSchema', schema: schemas.mouseMoveJsonSchema },
      { name: 'mouseClickJsonSchema', schema: schemas.mouseClickJsonSchema },
      { name: 'mouseDragJsonSchema', schema: schemas.mouseDragJsonSchema },
      { name: 'mouseScrollJsonSchema', schema: schemas.mouseScrollJsonSchema },
      { name: 'screenFindJsonSchema', schema: schemas.screenFindJsonSchema },
      { name: 'screenCaptureJsonSchema', schema: schemas.screenCaptureJsonSchema },
    ];

    schemasToCheck.forEach(({ name, schema }) => {
      if (schema.required) {
        schema.required.forEach((requiredProp: string) => {
          // Propriedades requeridas não devem ter default
          const property = schema.properties[requiredProp];
          if (property && typeof property === 'object' && !property.properties) {
            // É uma propriedade simples, não um objeto aninhado
            expect(property.default).toBeUndefined();
          }
        });
      }
    });
  });
});
