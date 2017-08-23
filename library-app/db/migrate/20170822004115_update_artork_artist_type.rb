class UpdateArtorkArtistType < ActiveRecord::Migration[5.1]
  def change
    change_column :artworks, :artist_id, :integer, using: 'artist_id::integer'
  end
end
