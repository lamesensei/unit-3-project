class GroupsController < ApplicationController
  def index
    if params[:code]
      @group = Group.find_by(code: params[:code])
      redirect_to group_path(@group)
    end
  end

  def show
    @group = Group.find(params[:id])
  end

  private

  def group_params
    params.require(:group).permit(:code)
  end
end
