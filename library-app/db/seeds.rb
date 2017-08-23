# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.destroy_all
user_1 = User.create!(username: Faker::Internet.user_name)
user_2 = User.create!(username: Faker::Internet.user_name)

Artwork.destroy_all
artw_1 = Artwork.create!(title: 'Artwork_1', image_url: Faker::Internet.url, artist_id: user_1.id)
artw_2 = Artwork.create!(title: 'Artwork_2', image_url: Faker::Internet.url, artist_id: user_2.id)

ArtworkShare.destroy_all
ArtworkShare.create!(artwork_id: artw_1.id, viewer_id: user_1.id)
ArtworkShare.create!(artwork_id: artw_2.id, viewer_id: user_1.id)

Comment.destroy_all
Comment.create!(body: "dummy comment", author_id: user_1.id, artwork_id: artw_1.id)
Comment.create!(body: "sorry for previous comment", author_id: user_1.id, artwork_id: artw_1.id)
Comment.create!(body: "damn, is the delete comment route working?", author_id: user_1.id, artwork_id: artw_1.id)

Comment.create!(body: "great !", author_id: user_2.id, artwork_id: artw_1.id)
Comment.create!(body: "meh ...", author_id: user_2.id, artwork_id: artw_2.id)
