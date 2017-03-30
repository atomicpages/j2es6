import { ClassGenerator } from '../src/generators/ClassGenerator';
import { InstanceMethodGenerator } from '../src/generators/InstanceMethodGenerator';
import * as fs from 'fs';

test('Instance variable definition produces JSTree-compliant structure', () => {
    const file = fs.readFileSync('res/chained-instance-vars.js');

});
