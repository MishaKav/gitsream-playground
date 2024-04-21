from pydash import get

def should_instrument(request, testing_functions_by_runtime):
  event = get(obj,"event")
  expected_event = get(obj,'expected')   
  expected_dismissed = get(obj,"dismissed",default={})
  requested_runtimes = get(obj,"runtimes")
  runtimes = [
      testing_functions_by_runtime[runtime] for runtime in requested_runtimes  # type: ignore
  ]