# == Schema Information
#
# Table name: goals
#
#  id         :integer          not null, primary key
#  title      :string
#  details    :text
#  public     :boolean          default(TRUE)
#  completed  :boolean          default(FALSE)
#  user_id    :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

FactoryGirl.define do
  factory :goal do
    title "My goal default"
    details "My goal default description"
    public false
    completed false
    user_id 1

    factory :no_title do
      title nil
    end

    factory :public do
      public true
    end
  end
end
