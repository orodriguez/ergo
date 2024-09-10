class ChangeCompletedInTodos < ActiveRecord::Migration[7.0]
  def change
    change_column_default :todos, :completed, from: nil, to: false
    change_column_null :todos, :completed, false
  end
end
