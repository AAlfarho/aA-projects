# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Cat.destroy_all
3.times do
  Cat.create( name: Faker::Name.name,
            sex: 'f',
            birth_date: Faker::Date.birthday(0, 14),
            description: Faker::Lorem.sentence,
            color: Cat.CAT_COLORS.sample,
          )
end

3.times do
  Cat.create( name: Faker::Name.name,
            sex: 'm',
            birth_date: Faker::Date.birthday(0, 14),
            description: Faker::Lorem.sentence,
            color: Cat.CAT_COLORS.sample,
          )
end

CatRentalRequest.destroy_all
3.times do |x|
  CatRentalRequest.create( cat_id: Cat.all[x].id,
            start_date: Faker::Date.between(2.days.ago, Date.today),
            end_date: Faker::Date.between(Date.today, 2.days.from_now),
            status: 'PENDING'
          )
end
