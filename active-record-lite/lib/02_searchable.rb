require_relative 'db_connection'
require_relative '01_sql_object'
require 'byebug'
module Searchable
  def where(params)
    where_string = params.map{|k,v|  "#{k} = ?"}.join(" and ")

    results = DBConnection.execute(<<-SQL, params.values)
      SELECT
        *
      FROM
        #{table_name}
      WHERE
        #{where_string}
    SQL
    parse_all(results)
  end
end

class SQLObject
  extend Searchable
  # Mixin Searchable here...
end
