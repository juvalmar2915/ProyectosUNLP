class AddNacimientoToUser < ActiveRecord::Migration[6.1]
  def change
    add_column :users, :nacimiento, :date
  end
end
