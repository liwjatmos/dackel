import DS from 'ember-data';

export default DS.Transform.extend({
  deserialize(serialized) {
    return serialized.map(function(s) {
      return s.text.substr(s.text.indexOf(" ") + 1);
    });
  },

  serialize(deserialized) {
    return deserialized;
  }
});
