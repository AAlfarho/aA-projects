require_relative '02_searchable'
require 'active_support/inflector'
require 'byebug'
# Phase IIIa
class AssocOptions
  attr_accessor(
    :foreign_key,
    :class_name,
    :primary_key
  )

  def model_class
    class_name.constantize
  end

  def table_name
    model_class.table_name
  end

  def get_foreign_key(class_name)
    "#{class_name.to_s.downcase.singularize}_id".to_sym
  end

  def get_class_name(name)
    name.to_s.singularize.camelcase
  end

end

class BelongsToOptions < AssocOptions
  def initialize(name, options = {})
    self.primary_key = options[:primary_key] || :id
    self.foreign_key = options[:foreign_key] || get_foreign_key(name)
    self.class_name = options[:class_name] || get_class_name(name)
  end
end

class HasManyOptions < AssocOptions
  def initialize(name, self_class_name, options = {})
    self.primary_key = options[:primary_key] || :id
    self.foreign_key = options[:foreign_key] || get_foreign_key(self_class_name)
    self.class_name = options[:class_name] || get_class_name(name)
  end
end

module Associatable
  # Phase IIIb
  def belongs_to(name, options = {})
    belongs_to = BelongsToOptions.new(name, options)
    assoc_options[name] = belongs_to
    define_method(name) do
      primary_key = belongs_to.send("primary_key")
      target_model_class = belongs_to.send("model_class")
      target_model_class.where({primary_key => id}).first
    end
  end

  def has_many(name, options = {})
    has_many = HasManyOptions.new(name, self, options)
    define_method(name) do
      foreign_key = has_many.send("foreign_key")
      target_model_class = has_many.send("model_class")
      target_model_class.where({foreign_key => id})
    end
  end

  def assoc_options
    @assoc_options ||= {}
    # Wait to implement this in Phase IVa. Modify `belongs_to`, too.
  end
end

class SQLObject
  # Mixin Associatable here...
  extend Associatable
end
