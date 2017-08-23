require_relative '03_associatable'
require 'byebug'
# Phase IV
module Associatable
  # Remember to go back to 04_associatable to write ::assoc_options

  def has_one_through(name, through_name, source_name)
    define_method(name) do
      through_opt = self.class.assoc_options[through_name]
      source_opt =
        through_opt.model_class.assoc_options[source_name]

      source_table_name = source_opt.model_class.table_name
      select_str = "#{source_table_name}.*"
      from_table_str = through_opt.model_class.table_name
      join_table = source_table_name
      on_clause = "#{from_table_str}.#{source_opt.foreign_key} = #{join_table}.#{source_opt.primary_key}"
      where_str = "#{from_table_str}.id = ?"
      foreign_key_val = attributes[through_opt.foreign_key]

      result = DBConnection.execute(<<-SQL,foreign_key_val)
        SELECT
          #{select_str}
        FROM
          #{from_table_str}
        JOIN
          #{join_table} ON #{on_clause}
        WHERE
          #{where_str}
      SQL
      source_opt.model_class.parse_all(result).first
    end
  end
end
