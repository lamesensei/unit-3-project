class MembersController < ApplicationController
  def index
  end

  def show
  end

  def new
    @member = Member.new
  end

  def create
    @group = Group.find_by(code: params[:group_code])
    @findmember = Member.find_by(name: params[:member][:name])
    if @findmember != nil && @findmember.group == @group
      cookies[:current_member] = @findmember.id
      return redirect_to @group
    end
    @member = Member.new(member_params)
    @member.group = @group
    @member.user = User.find(current_user.id) if current_user.present?
    @member.save
    cookies[:current_member] = @member.id
    redirect_to @group
  end

  def update
    @member = Member.find(params[:id])
    @member.lat = params[:member][:lat]
    @member.lon = params[:member][:lon]
    @member.place = params[:member][:place]
    @member.icon = params[:member][:icon]
    @member.save
    redirect_to @member.group
  end

  private

  def member_params
    params.require(:member).permit(:name)
  end
end
