require_relative 'db_connection'
require 'byebug'
require 'active_support/inflector'
# NB: the attr_accessor we wrote in phase 0 is NOT used in the rest
# of this project. It was only a warm up.

class SQLObject
  @table_name = String.new
  @table_columns = String.new
  def self.columns
    unless @table_columns
      cats = DBConnection.execute2(<<-SQL)
      SELECT
        *
      FROM
        #{table_name}
      LIMIT
        0
      SQL
      @table_columns = cats[0].map(&:to_sym)
    end
    @table_columns
  end

  def self.finalize!
    columns.each do |c|
      define_method(c) do
        attributes[c]
      end
      define_method(c.to_s+"=") do |val|
        attributes[c] = val
      end
    end
  end

  def self.table_name=(table_name)
    @table_name = table_name
  end

  def self.table_name
    @table_name || self.to_s.tableize
  end

  def self.all
    # ...
    results = DBConnection.execute(<<-SQL)
    SELECT
      *
    FROM
      #{table_name}
    SQL
    parse_all(results)
  end

  def self.parse_all(results)
    results.map do |entry|
      self.new(entry)
    end
  end

  def self.find(id)
    # ...
    result = DBConnection.execute(<<-SQL, id)
    SELECT
      *
    FROM
      #{table_name}
    WHERE
      id = ?
    SQL
    parse_all(result).first
  end

  def initialize(params = {})
    # ...
    params.each do |k, v|
      col_sym = k.to_sym
      raise "unknown attribute '#{k}'" unless self.class.columns.include?(col_sym)
      self.send("#{col_sym}=", v)
    end
  end

  def attributes
    @attributes ||= {}
  end

  def attribute_values
    attr_values = []
    self.class.columns.each do |column|
      attr_values << attributes[column]
    end
    attr_values
  end

  def insert
    # ...
    col_names = self.class.columns.map(&:to_s).join(",")
    attr_vals = attribute_values
    n_values = (["?"] *  attr_vals.length).join(",")
    DBConnection.execute(<<-SQL, attr_vals)
      INSERT INTO
        #{self.class.table_name} (#{col_names})
      VALUES
        (#{n_values})
    SQL
    self.id = DBConnection.last_insert_row_id
  end

  def update
    set_line = self.class.columns.map(&:to_s).join(" = ?,") + " = ?"
    DBConnection.execute(<<-SQL, attribute_values, self.id)
      UPDATE
        #{self.class.table_name}
      SET
        #{set_line}
      WHERE
        id = ?
    SQL
  end

  def save
    self.id ? update : insert
  end
end
